import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', (req,res) => {
    res.render('login');
})

router.post('/', async (req,res) => {
    const vars = req.body;
    const admin = await selectSql.getAdmin();
    const customer = await selectSql.getCustomer();
    let whoAmI = '';
    let ssn = '';
    let checkLogin = false;

    admin.map((user) => {
        if(vars.id === user.id && vars.password === user.pwd) {
            checkLogin = true;
            whoAmI = 'admin';
        }
    })
    customer.map((user) => {
        if(vars.id === user.id && vars.password === user.pwd) {
            checkLogin = true;
            whoAmI = 'customer';
            ssn = user.Ssn;
        }
    })

    if(checkLogin && whoAmI === 'admin'){
        res.redirect('/admin');
        console.log('login admin!');
    } else if(checkLogin && whoAmI === 'customer'){
        res.redirect('/customer?ssn=' + ssn);
        console.log('login customer!');
    } else {
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>")
    }

})

module.exports = router;