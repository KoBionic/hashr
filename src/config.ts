const name = process.env.REACT_APP_NAME;
const repositoryURL = process.env.REACT_APP_REPOSITORY_URL.replace(/git\+|\.git/g, '');
const version = process.env.REACT_APP_VERSION;

const config = {
  companyURL: 'https://github.com/kobionic',
  name,
  releaseURL: `${repositoryURL}/releases/tag`,
  repositoryURL,
  version,
};

export default config;
