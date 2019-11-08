const index_form=(req,res,next)=>{
    res.render('index_form',{tit:'ex_index_form'})
}

const postindex_form=(req,res,next)=>{
    const degree=req.body.degree;
    speed=req.body.speed;
    res.render('indexpoly_ex',{tit:'ex_index_poly',degree:degree,speed:speed})
}
  


module.exports={
    index_form:index_form,
    postindex_form:postindex_form
}