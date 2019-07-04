import { expect } from 'chai';
import SectionService from '@/services/sectionService';

describe('Section service:', async () => {
  let service;

  beforeEach(() => {
    service = new SectionService();
  });

  it('method getSections should return an array', async () => {
    const sections = await service.getSections();
    expect(sections).to.be.an('array');
  });

  it('method getSectionByName should return one section slugs for title "health"', async () => {
    const section = await service.getSectionByName('health');
    expect(section.slugs).to.be.an('array').with.lengthOf(1);
    expect(section.slugs).to.be.deep.equal(['health']);
  });

  it('method getSectionByName should return two section slugs for title "science_technology"', async () => {
    const section = await service.getSectionByName('science_technology');
    expect(section.slugs).to.be.an('array').with.lengthOf(2);
    expect(section.slugs).to.be.deep.equal(['science', 'technology']);
  });

  it('method getSectionByName should not return section for empty name', async () => {
    const section = await service.getSectionByName('');
    expect(section).to.be.deep.equal({});
  });

  it('method getSectionByName should not return section for null name', async () => {
    const section = await service.getSectionByName(null);
    expect(section).to.be.deep.equal({});
  });
});
