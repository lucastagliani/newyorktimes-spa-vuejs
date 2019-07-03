import nytimesResponseMock from './nytimes-response-mock.json';

export default { getTopStoriesFromSection: () => Promise.resolve({ data: nytimesResponseMock }) };
