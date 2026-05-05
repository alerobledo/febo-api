import 'dotenv/config';
import { app, finalizeApp } from './app.js';

const PORT = process.env.PORT || 3001;

finalizeApp(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
