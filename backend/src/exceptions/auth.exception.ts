export const authException = {
  USER_NAME: () => {
    throw {
      statusCode: 400,
      message: '아이디를 입력하세요.',
    };
  },
  PASSWORD: () => {
    throw {
      statusCode: 400,
      message: '비밀번호를 입력하세요.',
    };
  },
  NOT_SAME_PASSWORD: () => {
    throw {
      statusCode: 400,
      message: '비밀번호가 동일하지 않습니다.',
    };
  },
  FIRST_NAME: () => {
    throw {
      statusCode: 400,
      message: '이름을 입력하세요.',
    };
  },
  LAST_NAME: () => {
    throw {
      statusCode: 400,
      message: '성씨를 입력하세요',
    };
  },
  ALREADY_EXIST_USER: () => {
    throw {
      statusCode: 409,
      message: '이미 존재하는 계정입니다.',
    };
  },
  NOT_FOUND_USER: () => {
    throw {
      statusCode: 404,
      message: '사용자를 찾을 수 없습니다.',
    };
  },
  WRONG_PASSWORD: () => {
    throw {
      statusCode: 401,
      message: '비밀번호가 일치하지 않습니다.',
    };
  },
  NEED_SIGNIN: () => {
    throw {
      statusCode: 401,
      message: '로그인이 필요합니다.',
    };
  },
  INVALID_TOKEN: () => {
    throw {
      statusCode: 401,
      message: '유효하지 않은 토큰입니다.',
    };
  },
  EXPIRED_TOKEN: () => {
    throw {
      statusCode: 403,
      message: '토큰이 만료되었습니다.',
    };
  },
};
