/**
 * The Link class defines the properties of a link to a webpage
 */
class Link {
  /**
   * CReates a link to a webpage
   * @param {object} settings
   * @param {string} settings.label The visible representation of the link
   * @param {string} settings.url
   */
  constructor({ url, label = url }) {
    Object.assign(this, { url, label });
  }
}

/**
 * The Image class defines the properties of an image and its display properties
 */
class Image {
  /**
   * Creates an image and its display properties
   * @param {object} settings
   * @param {string} settings.source A path to an image
   * @param {number} settings.positionX The horizontal offset of the image relative to the left upper corner of the wrapper
   * @param {number} settings.positionY The vertical offset of the image relative to the left upper corner of the wrapper
   * @param {number} settings.scale The ratio of the computed size to the size defined in the styles
   */
  constructor({ source, positionX, positionY, scale }) {
    Object.assign(this, { source, positionX, positionY, scale });
  }
}

/**
 * The ListItem class defines a list member
 */
class ListItem {
  /**
   * Creates a list member
   * @param {object} settings
   * @param {*} settings.value
   * @param {string} [settings.id = crypto.randomUUID()]
   */
  constructor({ value, id = crypto.randomUUID() }) {
    Object.assign(this, { value, id });
  }
}

/**
 * The BasicDate class defines the properties of a basic date
 */
class BasicDate {
  /**
   * Creates a basic date
   * @param {object} settings
   * @param {number} settings.month
   * @param {number} settings.year
   */
  constructor({ month, year }) {
    Object.assign(this, { month, year });
  }
}

/**
 * The CurrentlyDate class defines the properties a date that represents the present moment
 */
class CurrentlyDate {
  /**
   * Creates a date that represents the present moment
   */
  constructor() {
    Object.assign(this, { isCurrently: true });
  }
}

/**
 * The DateRange class defines a range of dates
 */
class DateRange {
  /**
   * Creates a range of dates
   * @param {object} settings
   * @param {BasicDate|CurrentlyDate} settings.start
   * @param {BasicDate|CurrentlyDate} settings.finish
   */
  constructor({ start, finish }) {
    Object.assign(this, { start, finish });
  }
}

/**
 * The Project class defines the properties of a project
 */
class Project {
  /**
   * Creates a project
   * @param {object} settings
   * @param {string} settings.name
   * @param {string} settings.description
   * @param {string} settings.role The role/s the user had in the project
   * @param {DateRange} settings.dateRange The dates the project took place
   */
  constructor({ name, description, role, dateRange }) {
    Object.assign(this, { name, description, role, dateRange });
  }
}

/**
 * The Job class defines the properties of a job
 */
class Job {
  /**
   * Creates a job
   * @param {object} settings
   * @param {string} settings.organization
   * @param {string} settings.role
   * @param {DateRange} settings.dateRange
   * @param {Array<ListItem>} settings.tasks
   */
  constructor({ organization, role, dateRange, tasks }) {
    Object.assign(this, { organization, role, dateRange, tasks });
  }
}

/**
 * The Study class defines the properties of a study
 */
class Study {
  /**
   * Creates a study
   * @param {object} settings
   * @param {string} settings.issuingOrganization
   * @param {string} settings.study
   * @param {DateRange} settings.dateRange
   */
  constructor({ issuingOrganization, study, dateRange }) {
    Object.assign(this, { issuingOrganization, study, dateRange });
  }
}

/**
 * The Award class defines the properties of an award
 */
class Award {
  /**
   * Creates an award
   * @param {object} settings
   * @param {string} settings.issuingOrganization
   * @param {string} settings.motive
   * @param {BasicDate} settings.date
   */
  constructor({ issuingOrganization, motive, date }) {
    Object.assign(this, { issuingOrganization, motive, date });
  }
}

/**
 * The HardSkill class defines the properties of a hardSkill
 */
class HardSkill {
  /**
   * Creates a hardSkill
   * @param {object} settings
   * @param {string} settings.skill
   * @param {Image} settings.icon
   * @param {number} settings.level A number between 1 and 10 that represents the expertise in some skill
   */
  constructor({ skill, icon, level }) {
    Object.assign(this, { skill, icon, level });
  }
}

/**
 * The UserData class defines the user information relevant for a CV
 */
class UserData {
  /**
   * Creates an user data
   * @param {object} settings
   * @param {string} settings.name
   * @param {string} settings.lastName
   * @param {string} settings.title A short sentence defining your profession
   * @param {string} settings.description
   * @param {Image} [settings.avatar = {}]
   * @param {string} settings.mail
   * @param {string} settings.phoneNumber
   * @param {string} settings.address
   * @param {Link} [settings.linkedIn = {}]
   * @param {Link} [settings.github = {}]
   * @param {Link} [settings.webSite = {}]
   * @param {Array<Project>} [settings.projects = []]
   * @param {Array<Job>} [settings.jobs = []]
   * @param {Array<Award>} [settings.awards = []]
   * @param {Array<HardSkill>} [settings.hardSkills = []]
   * @param {Array<ListItem>} [settings.softSkills = []]
   * @param {Array<Study>} [settings.studies = []]
   */
  constructor({
    name,
    lastName,
    title,
    description,
    avatar = {},
    mail,
    phoneNumber,
    address,
    linkedIn = {},
    github = {},
    webSite = {},
    projects = [],
    jobs = [],
    awards = [],
    hardSkills = [],
    softSkills = [],
    studies = [],
  }) {
    Object.assign(this, {
      name,
      lastName,
      title,
      description,
      avatar,
      mail,
      phoneNumber,
      address,
      linkedIn,
      github,
      webSite,
      projects,
      jobs,
      awards,
      hardSkills,
      softSkills,
      studies,
    });
  }
}

export {
  UserData,
  HardSkill,
  Award,
  Study,
  Job,
  Project,
  DateRange,
  CurrentlyDate,
  BasicDate,
  ListItem,
  Image,
  Link,
};
