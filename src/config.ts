const companyURL = 'https://github.com/kobionic';
const name = process.env.REACT_APP_NAME;
const repositoryURL = 'https://github.com/kobionic/hashr';
const version = process.env.REACT_APP_VERSION;

const config = {
  companyURL,
  name,
  releaseURL: `${repositoryURL}/releases/tag`,
  repositoryURL,
  version,
};

export default config;
