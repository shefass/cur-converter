const { Currency, Name, Log, sequelize } = require("./model");
const axios = require("axios");
const convert = require("xml-js");


async function bulkCreate(model, data) {
    const currecies = await model.bulkCreate(data);
    
}

async function init() {
    try {
      sequelize
        .authenticate()
        .then(() => console.log("Connection has been established successfully."))
        .then(() => Currency.sync())
        .then(() => Currency.destroy({        
            truncate: true
          }))
        .then(() => getCurrentFxRates())
        .then(() => Name.sync())
        .then(() => Name.destroy({        
          truncate: true
        }))
        .then(() => getCurrentFxNames())
        .then(() => Log.sync())
     } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

function convertXMLtoJS(response){
    let object = convert.xml2js(response.data, { compact: true, trim: true });
    let answer = object.FxRates.FxRate.map((e) => {
      let pair = {};
      pair.Date = e.Dt._text;
      pair.ticker = e.CcyAmt[1].Ccy._text;
      pair.rate = Number(e.CcyAmt[1].Amt._text);
  
      return pair;
    });
    return answer;
    
  };

function convertXMLtoJSnames(response){
    let object = convert.xml2js(response.data, { compact: true, trim: true });
    let answer = object.CcyTbl.CcyNtry.map((e) => {
      let pair = {};
      pair.ticker = e.Ccy._text;
      pair.LT = e.CcyNm[0]._text;
      pair.EU = e.CcyNm[1]._text;
  
      return pair;
    });
    return answer;
   
  };

  async function getCurrentFxRates(){
    axios
      .get(
        "https://www.lb.lt/webservices/fxrates/FxRates.asmx/getCurrentFxRates?tp=EU"
      )
      .then((response) => {
        const answer = convertXMLtoJS(response);

        bulkCreate(Currency, answer);
      })
      .catch((error) => {
        console.log(error);
      });
  };


async function getCurrentFxNames(){
  axios
    .get("https://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList")
    .then((response) => {
      const answer = convertXMLtoJSnames(response);

      bulkCreate(Name, answer);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.init = init;
