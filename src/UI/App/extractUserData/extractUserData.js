import {
  UserData,
  Link,
  Project,
  Award,
  HardSkill,
  Study,
  Image,
} from "../../../settings/UserData";

const isPersonForm = ({ templateId }) => templateId === "personForm";

const getName = (model) => {
  const isName = ({ templateId }) => templateId === "name";
  return model.find(isPersonForm).value.find(isName).value;
};

const getLastName = (model) => {
  const isLastName = ({ templateId }) => templateId === "lastName";
  return model.find(isPersonForm).value.find(isLastName).value;
};

const getTitle = (model) => {
  const isTitle = ({ templateId }) => templateId === "title";
  return model.find(isPersonForm).value.find(isTitle).value;
};

const getDesc = (model) => {
  const isDesc = ({ templateId }) => templateId === "description";
  return model.find(isPersonForm).value.find(isDesc).value;
};

const getAvatar = (model) => {
  const isAvatar = ({ templateId }) => templateId === "avatar";
  return new Image(model.find(isPersonForm).value.find(isAvatar).value);
};

const isContactForm = ({ templateId }) => templateId === "contactForm";

const getMail = (model) => {
  const isMail = ({ templateId }) => templateId === "mail";
  return model.find(isContactForm).value.find(isMail).value;
};

const getPhone = (model) => {
  const isPhoneNumber = ({ templateId }) => templateId === "phoneNumber";
  return model.find(isContactForm).value.find(isPhoneNumber).value;
};

const getAddress = (model) => {
  const isAddress = ({ templateId }) => templateId === "address";
  return model.find(isContactForm).value.find(isAddress).value;
};

const getLinkedIn = (model) => {
  const isLinkedIn = ({ templateId }) => templateId === "linkedIn";
  const isUrl = ({ templateId }) => templateId === "url";
  const isLabel = ({ templateId }) => templateId === "user";
  const value = model.find(isContactForm).value.find(isLinkedIn).value;
  return new Link({
    url: value.find(isUrl).value,
    label: value.find(isLabel).value,
  });
};

const getGithub = (model) => {
  const isGithub = ({ templateId }) => templateId === "github";
  const isUrl = ({ templateId }) => templateId === "url";
  const isLabel = ({ templateId }) => templateId === "user";
  const value = model.find(isContactForm).value.find(isGithub).value;
  return new Link({
    url: value.find(isUrl).value,
    label: value.find(isLabel).value,
  });
};

const getWebSite = (model) => {
  const isWebSite = ({ templateId }) => templateId === "webSite";
  const isUrl = ({ templateId }) => templateId === "url";
  const isLabel = ({ templateId }) => templateId === "webSiteName";
  const value = model.find(isContactForm).value.find(isWebSite).value;
  return new Link({
    url: value.find(isUrl).value,
    label: value.find(isLabel).value,
  });
};

const isExperienceForm = ({ templateId }) => templateId === "experienceForm";

const getProjects = (model) => {
  const isProject = ({ templateId }) => templateId === "project";

  const extractProjectSettings = (node) => {
    const buildSettings = (settings, current) => {
      return { ...settings, [current.templateId]: current.value };
    };
    return node.value.reduce(buildSettings, {});
  };

  const buildProject = (settings) => {
    return new Project({
      name: settings.projectName,
      description: settings.projectDescription,
      role: settings.role,
      dateRange: settings.dateRange,
    });
  };

  return model
    .find(isExperienceForm)
    .value.filter(isProject)
    .map(extractProjectSettings)
    .map(buildProject);
};

const getJobs = (model) => {
  const isJob = ({ templateId }) => templateId === "job";

  const extractJob = (node) => {
    const buildSettings = (settings, current) => {
      return { ...settings, [current.templateId]: current.value };
    };
    return node.value.reduce(buildSettings, {});
  };

  return model.find(isExperienceForm).value.filter(isJob).map(extractJob);
};

const getAwards = (model) => {
  const isAwardsForm = ({ templateId }) => templateId === "awardsForm";

  const extractAwardSettings = (node) => {
    const buildSettings = (settings, current) => {
      return { ...settings, [current.templateId]: current.value };
    };
    return node.value.reduce(buildSettings, {});
  };

  const buildAward = (settings) => {
    return new Award({
      issuingOrganization: settings.issuingOrganization,
      motive: settings.motive,
      date: settings.issuingDate,
    });
  };

  return model
    .find(isAwardsForm)
    .value.map(extractAwardSettings)
    .map(buildAward);
};

const getHardSkills = (model) => {
  const isHardSkillsForm = ({ templateId }) => templateId === "hardSkillsForm";

  const isSkill = ({ templateId }) => templateId === "skill";

  const extractHardSkillSettings = (node) => {
    const buildSettings = (settings, current) => {
      return { ...settings, [current.templateId]: current.value };
    };
    return node.value.reduce(buildSettings, {});
  };

  const buildHardSkill = (settings) => {
    return new HardSkill({
      skill: settings.skillName,
      icon: settings.icon,
      level: settings.level,
    });
  };

  return model
    .find(isHardSkillsForm)
    .value.filter(isSkill)
    .map(extractHardSkillSettings)
    .map(buildHardSkill);
};

const getSoftSkills = (model) => {
  const isSoftSkillsForm = ({ templateId }) => templateId === "softSkillsForm";

  const isSkillList = ({ templateId }) => templateId === "skillList";

  return model.find(isSoftSkillsForm).value.filter(isSkillList).value;
};

const getStudies = (model) => {
  const isEducationForm = ({ templateId }) => templateId === "educationForm";

  const extractStudySettings = (node) => {
    const buildSettings = (settings, current) => {
      return { ...settings, [current.templateId]: current.value };
    };
    return node.value.reduce(buildSettings, {});
  };

  const buildStudy = (settings) => {
    return new Study({ ...settings, study: settings.studyName });
  };

  return model
    .find(isEducationForm)
    .value.map(extractStudySettings)
    .map(buildStudy);
};

/**
 * The extractUserData extract from a model the corresponding userData
 * @param {import("../../../hooks/useFormModel").model} model
 * @returns {import("../../../settings/UserData").UserData}
 */
function extractUserData(model) {
  return new UserData({
    name: getName(model),
    lastName: getLastName(model),
    title: getTitle(model),
    description: getDesc(model),
    avatar: getAvatar(model),
    mail: getMail(model),
    phoneNumber: getPhone(model),
    address: getAddress(model),
    linkedIn: getLinkedIn(model),
    github: getGithub(model),
    webSite: getWebSite(model),
    projects: getProjects(model),
    jobs: getJobs(model),
    awards: getAwards(model),
    hardSkills: getHardSkills(model),
    softSkills: getSoftSkills(model),
    studies: getStudies(model),
  });
}

export default extractUserData;
