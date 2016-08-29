const express = require('express');
const router = express.Router();

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

module.exports = router;
