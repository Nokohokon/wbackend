passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify', 'email'],  // Die gewünschten Berechtigungen für die App
}, (accessToken, refreshToken, profile, done) => {
  // Hier kannst du die Discord-ID speichern
  const user = {
    id: profile.id,  // Discord ID
    username: profile.username,
    discriminator: profile.discriminator,
    email: profile.email
  };
  done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
