import predefinedSections from '@/data/predefinedSections.json';

class SectionService {
  getSections = () => predefinedSections;

  getSectionByName = (name) => {
    const result = predefinedSections.find(s => s.name === name);
    if (!result) {
      return {};
    }

    return result;
  };
}

export default SectionService;
