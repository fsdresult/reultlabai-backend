
const pool=require('../database/keys');
const authentication = {};


authentication.signUp = async (req, res) => {
  const { first_name,last_name, email, password, role } = req.body;
  const {user_name} = req.body;
 
  if (role == "doctor") {
    try {
      await pool.query(
        "INSERT INTO doctors (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        [first_name,last_name, email,password]
      );
      res.status(200).json({
        message: "Successful registred doctor",
        doctor: { first_name,last_name, email, password },
      });
    } catch (error) {
      if (error.constraint == "doctor_key") {
        res.status(500).json({
          message: "Someone is already using that email",
          error,
        });
      } else {
        res.status(500).json({
          message: "An error has ocurred",
          error,
        });
      
      }
    }
  } else if(role=="user"){
   
    try {
      await pool.query(
        "INSERT INTO users (first_name,last_name,email,password) VALUES ($1, $2, $3,$4)",
        [first_name, last_name,email,password]
      );
      res.status(200).json({
        message: "Successful registred users",
        users: { first_name,last_name, email },
      });
    } catch (error) {
      if (error.constraint == "user_key") {
        res.status(500).json({
          message: "Someone is already using that email",
          error,
        });
      } else {
        res.status(500).json({
          message: "An error has ocurred",
          error,
        });
        
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO admins (user_name,email,password) VALUES ($1, $2, $3)",
        [user_name,email,password]
      );
      res.status(200).json({
        message: "Successful registred users",
        admin: { user_name, email },
      });
    } catch (error) {
      if (error.constraint == "admin_key") {
        res.status(500).json({
          message: "Someone is already using that email",
          error,
        });
      } else {
        res.status(500).json({
          message: "An error has ocurred",
          error,
        });
        
      }
    }
  }
};

authentication.signIn = async (req, res) => {
  const { email, password, role } = req.body;

 
  if (role == "doctor") {
    try {
      const doctor = await (
        await pool.query(
          "SELECT * FROM doctors WHERE email=$1 AND password=$2",
          [email,password]
        )
      ).rows;

      if (doctor.length > 0) {
       res.status(200).json({
         id: doctor[0].id,
        first_name: doctor[0].first_name,
        last_name: doctor[0].last_name,
        email: doctor[0].email,
           role: "doctor"
       });
      }
       else {
        res.status(200).json({
          message: "The doctor does not exist",
          NotFound: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "An error has ocured",
        error,
      });
    }
  } else if(role=="user"){
    try {
      const users = await (
        await pool.query(
          "SELECT * FROM users WHERE email=$1 AND password=$2",
          [email, password]
        )
      ).rows;
      if (users.length > 0) {
        res.status(200).json({
          id: users[0].id,
          name: users[0].first_name,
          email: users[0].email,
          role: "user",
        });
      } else {
        res.status(200).json({
          message: "Users does not exist",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "An error has ocured",
        error,
      });
    }
  } else {
    try {
      const admin = await (
        await pool.query(
          "SELECT * FROM admins WHERE email=$1 AND password=$2",
          [email, password]
        )
      ).rows;
      if (admin.length > 0) {
        res.status(200).json({
          id: admin[0].id,
          name: admin[0].user_name,
          email: admin[0].email,
          role: "admin",
        });
      } else {
        res.status(200).json({
          message: "Users does not exist",
          NotFound: true,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "An error has ocured",
        error,
      });
    }
  }
};

module.exports = authentication;
