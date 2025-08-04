const express = require('express')
const router = express.Router()
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

var data = [
  { id: 1, Name: "Bilal", designation: "HR", location: "kozhikode",salary:80000 },
  {  id: 2, Name: "Marco", designation: "SDE", location: "Thiruvananthapuram",salary:90000 },
  {  id: 3, Name: "Rocky", designation: "HR", location: "Cochin",salary:20000 }
];

function employeeroutes(nav) {
    router.get('/', (req, res) => {
        res.render("home", {
            title: 'EJS',
            data,
            nav
        })
    })

    router.get('/form', (req, res) => {
        res.render("addemployee", {
            title: 'form',
            nav
        })
    })

    router.post('/add', (req, res) => {
        data.push(req.body)
        res.redirect('/basic')
    }
    )
    // router.put('/edit/:id', (req, res) => {
    //     data.splice(req.params.id, 1, req.body);
    //     res.send(data);
    // })
    // router.delete('/remove/:id',(req,res) => {
    //     data.pop();
    //     res.send(data);
    // })
    router.get('/edit/:id', (req, res) => {
        const index = req.params.id;
        const employee = data[index];
        res.render("editemployee", { employee, index });
    });
    router.post('/update/:id', (req, res) => {
        const id = req.params.id;
        data[id] = req.body;
        res.redirect('/basic');
    });
    router.post('/delete/:id', (req, res) => {
        const id = req.params.id;
        data.splice(id, 1);
        res.redirect('/basic');
    });
    return router
}
module.exports = employeeroutes