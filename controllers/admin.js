const pool = require("../database/keys");
const cloudinary = require('../lib/cloudinary');

const admin = {};
//doktor
//doktorları listeler.
admin.getDoctors = async (req, res) => {
  
  try {
    const doctors = await (
      await pool.query(
        "SELECT * FROM doctors"
      )
    ).rows;
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
      
    });
  }
};
// doktor ekleme fonksiyonu
admin.addDoctor = async (req, res) => {
  const { id, first_name,last_name, email, phone,status,user_id } = req.body;
  try {
    await pool.query('INSERT INTO doctors (id, first_name, last_name, email, phone,status,user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, first_name,last_name, email, phone,status,user_id]);
    const admins = await (await pool.query('SELECT * FROM doctors ORDER BY id DESC LIMIT 1')).rows[0];
    res.status(200).json({
      message: 'Successful added doctor',
      admins
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error has ocurred',
      error
    })
  }
};
//doktor silme fonskiyonu
admin.deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM doctors WHERE id=$1', [id]);
    res.status(200).json({
      message: 'Successful deleted doctor'
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error has ocurred',
      error
    })
  }
};
//doktor güncelleme fonksiyonu
admin.updateDoctor = async (req, res)=>{
  const id = req.params.id;
  const {first_name,last_name,email,phone,status,user_id} = req.body;
   try {
      await pool.query('UPDATE doctors SET first_name=$1, last_name=$2, email=$3,phone=$4,status=$5,user_id=$6 WHERE id=$7', [first_name,last_name,email,phone,status,user_id, id]);
       res.status(200).json({
          message: 'Successful edited doctors',
          result: {first_name,last_name,email,phone,status,user_id}
      })
   } catch (error) {
    console.log(error);
    res.status(500).json({
           message: 'An error has ocurred',
           error
       })
      
      
      
  }
};
//patient crud
//hasta ekleme fonksiyonu
admin.addPatient = async (req, res) => {
  const { id, first_name,last_name, email, address,phone,gender,age,birth_date,status,doctor_id } = req.body;
  try {
    await pool.query('INSERT INTO patients (id, first_name, last_name, email,address, phone,gender,age,birth_date,status,doctor_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)', [id, first_name,last_name, email,address, phone,gender,age,birth_date,status,doctor_id]);
    const patient = await (await pool.query('SELECT * FROM patients ORDER BY id DESC LIMIT 1')).rows[0];
    res.status(200).json({
      message: 'Successful added patient',
      patient
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error has ocurred',
      error
    })
  }
};
//hasta silme fonksiyonu
admin.deletePatient = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM patients WHERE id=$1', [id]);
    res.status(200).json({
      message: 'Successful deleted patient'
    })
  } catch (error) {
    res.status(500).json({
      message: 'An error has ocurred',
      error
    })
  }
};
//hasta güncelleme fonskiyonu
admin.updatePatient = async (req, res)=>{
  const id = req.params.id;
  const {first_name,last_name,email,address,phone,gender,age,birth_date,status,doctor_id} = req.body;
   try {
      await pool.query('UPDATE patients SET first_name=$1, last_name=$2, email=$3,address=$4, phone=$5,gender=$6,age=$7,birth_date=$8,status=$9,doctor_id=$10 WHERE id=$11', [first_name,last_name,email,address,phone,gender,age,birth_date,status,doctor_id, id]);
       res.status(200).json({
          message: 'Successful edited patient',
          result: {first_name,last_name,email,address,phone,gender,age,birth_date,status,doctor_id}
      })
   } catch (error) {
    console.log(error);
    res.status(500).json({
           message: 'An error has ocurred',
           error
       })
      
      console.log(error);
      
  }
};
//users
//kullanıcıları listeler. Hasta,doktor ve daha sonra eklenecek roller birer kullanıcı
admin.getUsers = async (req, res) => {
  
  try {
    const users = await (
      await pool.query(
        "SELECT * FROM users"
      )
    ).rows;
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
  }
};


//id ye göre kullanıcıları getirir.
admin.getUserById = async (req, res) => {
  const id = req.params.id;
  
  try {
    const users = await (
      await pool.query(
        "SELECT * FROM users WHERE id=$1", [id]));
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({
      message: "An error has ocurred",
      error,
    });
    
  }

  
};


module.exports = admin;
