interface User {
  _id: string;
  email: string;
  profile: Profile;
}

interface Profile {
  local: {
    firstName: string;
    lastName: string;
    isActivated: boolean;
  };
}
