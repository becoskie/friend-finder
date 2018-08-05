
var data = require("../data/friends");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(data);
  });

  app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
    var difSum;
    var closestMatch;
    var perfectMatch;

    Object.keys(data).forEach(key => {
      //console.log(data[key].score);
     bestMatch(newFriend.score, data[key].score, data[key].name, data[key].image);
    });
    if (perfectMatch) {
      res.json(perfectMatch);
    } else {
      res.json(closestMatch);
    }
    var addData = new AddData(data.length + 1, newFriend.name, newFriend.image, newFriend.score);
    data.push(addData);

    function bestMatch(newData, exsistData, keyName, keyImage) {
      var difArr = [];
      var difTotal;
      for (i = 0; i < 10; i++) {
        if (Math.abs(newData[i] - exsistData[i]) > 0) {
          difArr.push(Math.abs(newData[i] - exsistData[i]));
        }
      }
      if (difArr === undefined || difArr.length == 0) {
        difTotal = 0;
      } else {
        difTotal = difArr.reduce(getSum);
      }
      // matchData.push(new Compare(keyId, difTotal));
      if (!difSum) {
        difSum = difTotal;
        closestMatch = new Match(keyName, keyImage);
      } else if (difTotal < difSum) {
        difSum = difTotal;
        closestMatch = new Match(keyName, keyImage);
      } else if (difTotal === 0) {
        perfectMatch = new Match(keyName, keyImage);
      }
    }

    function getSum(total, num) {
      return total + num;
    }

    function Match(name, image) {
      this.name = name;
      this.image = image;
    }
    
    function AddData(id, name, image, score) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.score = score;
    }

  });

};