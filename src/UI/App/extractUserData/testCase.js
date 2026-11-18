import {
  UserData,
  Award,
  HardSkill,
  Job,
  Project,
  Study,
} from "../../../settings/UserData";

const testCase = {
  model: [
    {
      templateId: "personForm",
      value: [
        {
          templateId: "name",
          component: "field",
        },
        {
          templateId: "lastName",
        },
        {
          templateId: "title",
        },
        {
          templateId: "description",
        },
        {
          templateId: "avatar",
          value: {},
        },
      ],
    },
    {
      templateId: "contactForm",
      value: [
        {
          templateId: "mail",
        },
        {
          templateId: "phoneNumber",
        },
        {
          templateId: "address",
        },
        {
          templateId: "linkedIn",
          value: [
            {
              templateId: "user",
            },
            {
              templateId: "url",
            },
          ],
        },
        {
          templateId: "github",
          value: [
            {
              templateId: "user",
            },
            {
              templateId: "url",
            },
          ],
        },
        {
          templateId: "webSite",
          value: [
            {
              templateId: "webSiteName",
            },
            {
              templateId: "url",
            },
          ],
        },
      ],
    },
    {
      templateId: "experienceForm",
      value: [
        {
          templateId: "job",
          value: [
            {
              templateId: "organization",
            },
            {
              templateId: "role",
            },
            {
              templateId: "dateRange",
            },
            {
              templateId: "tasks",
            },
          ],
        },
        {
          templateId: "project",
          value: [
            {
              templateId: "projectName",
            },
            {
              templateId: "projectDescription",
            },
            {
              templateId: "role",
            },
            {
              templateId: "dateRange",
            },
          ],
        },
      ],
    },
    {
      templateId: "educationForm",
      value: [
        {
          templateId: "study",
          value: [
            {
              templateId: "issuingOrganization",
            },
            {
              templateId: "studyName",
            },
            {
              templateId: "dateRange",
            },
          ],
        },
      ],
    },
    {
      templateId: "awardsForm",
      value: [
        {
          templateId: "award",
          value: [
            {
              templateId: "issuingOrganization",
            },
            {
              templateId: "motive",
            },
            {
              templateId: "issuingDate",
            },
          ],
        },
      ],
    },
    {
      templateId: "hardSkillsForm",
      value: [
        {
          templateId: "hardSkillTipCard",
        },
        {
          templateId: "skill",
          value: [
            {
              templateId: "skillName",
            },
            {
              templateId: "icon",
            },
            {
              templateId: "level",
            },
          ],
        },
      ],
    },
    {
      templateId: "softSkillsForm",
      value: [
        {
          templateId: "softSkillsTipCard",
        },
        {
          templateId: "skillList",
          value: [
            {
              value: "",
            },
          ],
        },
      ],
    },
  ],
  expectedResult: new UserData({
    awards: [new Award()],
    hardSkills: [new HardSkill()],
    jobs: [new Job()],
    projects: [new Project()],
    studies: [new Study()],
  }),
};

export default testCase;
