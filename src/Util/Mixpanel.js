import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.MIXPANEL_TOKEN);
const envCheck = process.env.NODE_ENV === 'production';

const Mixpanel = {
  track: (name, props) => {
    if (envCheck) {
      mixpanel.track(name, props);
    }
  },
};

export default Mixpanel;
