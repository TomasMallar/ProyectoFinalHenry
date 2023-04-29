const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User, Rol } =require("../../db");
const { encrypt } = require("../../helpers/password/bcryptHelper")

passport.use(
    "auth-google",
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://${PORT}/auth/google',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
             // Verifica si el usuario ya existe en la base de datos
            const existingUser = await User.findOne({ where: { googleId: profile.id } });
        
            if (existingUser) {
            // Si el usuario ya existe, lo retorna
                return done(null, existingUser);
            }

            //Creamos una contraseña por default para que cagar a la db
            const passwordDefault = await encrypt(profile.emails[0].value);

            //Se asigna un rol en caso de no estar creado
            const roles = await Rol.findOne({ where: { rol_name: 'user' } });

            // Si el usuario no existe, lo crea en la base de datos
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.name.givenName,
                surname: profile.name.familyName,
                mail: profile.emails[0].value,
                password: passwordDefault,
                // phone: profile._json.phoneNumbers[0]?.value ?? "111-222-333",
                // date_of_birth: profile._json.birthday ?? "2000-01-01",
                phone: "11222333",
                date_of_birth: "2000-01-01",
                rolId: roles.id,
            });

            // Retorna el nuevo usuario creado
            return done(null, newUser);
            } catch (err) {
            return done(err, null);
            }
        }
    )
)

module.exports = passport;