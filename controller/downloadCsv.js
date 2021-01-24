const fs = require('fs');
const moment = require('moment');
const mdq = require('mongo-date-query');
const json2csv = require('json2csv').parse;
const path = require('path')
const fields = ['name', 'email', 'mac-address', 'department', 'password', 'date', 'clock_in_time'];
import AdminRecords from '../model/AdminRecords';


const downloadCsv = async(req, res) => {

    const records = await AdminRecords.find({user_id:req.payload.id}).sort({date:-1})
    console.log(records)
    if (!records) {
      return res.status(500).json('not found');
    }
    else {
      let csv
      try {
        csv = json2csv(records, { fields });
        console.log(csv)
      } catch (err) {
        return res.status(500).json({ err });
      }
      const dateTime = moment().format('YYYYMMDDhhmmss');
      const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
      fs.writeFile(filePath, csv, function (err) {
        if (err) {
          return res.json(err).status(500);
        }
        else {
          setTimeout(function () {
            fs.unlinkSync(filePath); // delete this file after 30 seconds
          }, 60000)
          return res.json("/exports/csv-" + dateTime + ".csv");
        }
      });

    }
  
}
export default downloadCsv;