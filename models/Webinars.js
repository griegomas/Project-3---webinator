var mongoose = require('mongoose');

var WebinarSchema = new mongoose.Schema({
  subject: String,
  description: String,
  starttime: String,
  endtime: String,
  url: String,
});

module.exports = mongoose.model('Webinar', WebinarSchema);
