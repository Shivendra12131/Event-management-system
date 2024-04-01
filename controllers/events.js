const Event = require("../models/event");

const {calculateDistance,
    fetchWeather,formatDate}=require('../utility/fetchapi')

const setFinalData = (eventsWithData, pageSize) => {
  const totalPages = Math.ceil(eventsWithData.length / pageSize);
  const finalData = [];

  for (let i = 0; i < totalPages; i++) {
    const startingIndex = i * pageSize;
    const endingIndex = (i + 1) * pageSize;

    const sliceData = {
      events: eventsWithData.slice(startingIndex, endingIndex),
      page: i + 1,
      pageSize: pageSize,
      totalPages: totalPages,
      totalEvents: eventsWithData.length,
    };

    finalData.push(sliceData);
  }

  return finalData;
};


const createEvent = async (req, res) => {

  try {

    const eventdata = req.body;
    const saveddata = await Event.create(eventdata);

    res.status(201).json(saveddata);
    res.end();
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const findevents = async (req, res) => {
    try {
      const { latitude, longitude, date } = req.query;
      let d = new Date(date);
      const dates = [];
      dates.push(formatDate(d));
      for (let i = 0; i < 14; i++) {
        d.setDate(d.getDate() + 1);
        dates.push(formatDate(d));
      }
      const datas = await Event.find({ date: { $in: dates } }).sort({ date: 1 });
      const eventsWithData = await Promise.all(
        datas.map(async (event) => {
          const weather = await fetchWeather(event.city_name, event.date);
          const distance = await calculateDistance(
            latitude,
            longitude,
            event.latitude,
            event.longitude
          );
          return {
            eventName: event.event_name,
            city: event.city_name,
            date: event.date,
            weather,
            distance,
          };
        })
      );
  
      const finalData = setFinalData(eventsWithData, 10);
  
      res.status(200).json({
        data: finalData,
        datas,
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        success: false,
        message: "Error occurred during fetching of the data",
      });
    }
  };
  


module.exports = { createEvent, findevents };
