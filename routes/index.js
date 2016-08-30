const express = require('express')
const router = express.Router()
const Xray = require('x-ray')

const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/playground';



/* GET home page. */
router.get('/pages', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  const content = [
    {
      id: 1,
      slug: "about",
      menu: "About",
      title: "About Us",
      body: "Our company was founded in 2015"
    }, {
      id: 2,
      slug: "contact",
      menu: "Contact",
      title: "Contact Us",
      body: "Feel free to contact us",
      form: {
        mailto: "zacharyalevy+dev@gmail.com",
        subject: true,
        body: true,
        button: "Send"
      }
    }, {
      id: 3,
      slug: "services",
      menu: "Services",
      title: "Services",
      body: [
        {
          id: 4,
          slug: "investment-advice",
          title: "Investment Advice",
          body: "We'll give you the best advice for real."
        },{
          id: 5,
          slug: "year-end-accounting",
          title: "Year End Accounting",
          body: "Don't worry about a thing, just ring your accountant."
        }
      ]
    }
  ]
  res.json(content)
});


/* GET home page. */
router.get('/pages/:id', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  const pages = [
    {
      id: 1,
      slug: "about",
      menu: "About",
      title: "About Us",
      body: "Our company was founded in 2015"
    }, {
      id: 2,
      slug: "contact",
      menu: "Contact",
      title: "Contact Us",
      body: "Feel free to contact us",
      form: {
        mailto: "zacharyalevy+dev@gmail.com",
        subject: true,
        body: true,
        button: "Send"
      }
    }, {
      id: 3,
      slug: "services",
      menu: "Services",
      title: "Services",
      body: [
        {
          id: 4,
          slug: "investment-advice",
          title: "Investment Advice",
          body: "We'll give you the best advice for real."
        },{
          id: 5,
          slug: "year-end-accounting",
          title: "Year End Accounting",
          body: "Don't worry about a thing, just ring your accountant."
        }
      ]
    }
  ]
  const id = req.params.id
  const page = pages.filter(page => {return page.id == id})[0] || null
  res.json(page)
});


router.get('/themes', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  const themes = [
    {
      name: "Red",
      slug: "theme-red",
      primaryColor: "darkred",
      secondaryColor: "red",
      tertiaryColor: "lightred"
    }, {
      name: "Blue",
      slug: "theme-blue",
      primaryColor: "darkblue",
      secondaryColor: "blue",
      tertiaryColor: "lightblue"
    }
  ]
  res.json(themes)
});

router.get("/scrape", function(req, res, next) {
  console.log("scrape")
  const x = Xray({
    filters: {
      // get rid of bad wysiwyg formatting hacks
      clean: function (text) {
        return text.replace(/\n+/g, "\n").replace(/\s+/g, " ").replace(/^\s/, "").replace(/\t+/g, "").replace(/\s$/, "")
      }
    }
  })
  x("http://firstexitmedia.com", "img.logo", [{
    src: "@src",
    alt: "@alt"
  }])(function(err, obj) {
    console.log(obj)

  })
  x("http://www.scantech.ca/mysite5/Scantech_%202012%20Website/Scantech_%202012%20Website/about_us.htm", "p", [{
    text: "@text | clean"
  }])(function(err, obj) {
    console.log(obj)
    obj.forEach(function(o) { console.log(o.text)})
    res.json(obj)
  })
})

router.get("/mongo", function(req, res, next) {
  console.log("mongo")
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err)
    console.log("Connected successfully to server")

    // insert
    // db.pages.insert([{
    //   domain: "firstexitmedia",
    //   test: 1
    // }])
    //
    // get
    const collection = db.collection("pages")
    // Find some documents
    collection.find({"domain": "firstexitmedia.com"}).toArray(function(err, docs) {
      assert.equal(err, null)
      db.close()
      console.log("Found the following records")
      console.log(docs)
      res.json(docs)
    })

  })

})

module.exports = router;
