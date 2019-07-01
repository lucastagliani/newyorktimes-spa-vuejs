import predefinedSections from '@/data/predefinedSections.json';

const getSections = () => predefinedSections;

const getSectionByName = (name) => {
  const result = predefinedSections.find(s => s.name === name);
  if (!result) {
    console.error('There is no section with this name');
    return {};
  }

  return result;
};

export default { getSections, getSectionByName };
