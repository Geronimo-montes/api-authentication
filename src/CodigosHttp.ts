// Codigos de Peticiones HTTP

// 200 OK PETICION EXITOSA
// 201 OK PETICION EXITOSA, RECURSO CREADO(PUT)

// 400 BAD ERROR DE SITAXIS
// 401 BAD UNAUTHORIZED. CREDENCIALES SIN VALIDAR.
// 403 BAD FORBIDDEN. SIN PERMISOS MECESARIOS.
// 404 NOT FOUNT

// 500 INTERNAL SERVER ERROR



// SEND FILE
// const OPTIONS = {
//   root: path.join(__dirname, 'private'),
//   dotfiles: 'deny',
//   headers: {
//     'x-timestamp': Date.now(),
//     'x-sent': true
//   }
// };

// const name = 'certificadodepreparatoría.png';
// res.sendFile(name, OPTIONS, (err) => {
//   if (err) throw err;
//   else console.log(`File ${name} send.`)
// })


// SEND MAIL
// const destino = 'geronimomontes101@gmail.com';
// const info = mail.sendMail(destino);
// res.status(200).json(new ResponseData(true, '', info));