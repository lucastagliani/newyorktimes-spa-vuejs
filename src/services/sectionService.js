import predefinedSections from '@/data/predefinedSections.json';

const getSections = () => predefinedSections;

const getSectionByName = (name) => {
  const result = predefinedSections.find(s => s.name === name);
  if (!result) {
    return {};
  }

  return result;
};

export default { getSections, getSectionByName };
