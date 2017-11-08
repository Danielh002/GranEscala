'use strcit'
function inviteUser(req,res){
    var nodemailer = require('nodemailer');
    
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                    user: "cooknetpontidev@gmail.com",
                    pass: 'cooknetPont'
                }
                });
            var html='<h1>'+req.user+' te invito a que hagas parte de <a href="cooknet.herokuapp.com">Cooknet</a></h1>';
            var mailOptions = {
              from: 'lenisandres5@gmail.com',
              to: req.body.email,
              subject: 'Invitacion a Cooknet',
              html:html
            };
    
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
            else {
            console.log('Email sent: ' + info.response);
            }
        });
    res.send({message:"the user was invited by email"})
}

module.exports={
    inviteUser
}