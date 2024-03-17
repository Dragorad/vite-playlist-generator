import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'vite.playlist.generator',
  appName: 'vite-playlist-generator',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  androidStudioPath: '/opt/android-studio-2023.1.1/android-studio/bin'
};

export default config;
