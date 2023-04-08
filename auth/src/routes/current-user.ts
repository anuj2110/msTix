import express from 'express';

const router = express.Router()

router.get('/api/users/currentUser',(req,res)=>{
    return res.send('Current User')
})

export {router as currentUserRouter}