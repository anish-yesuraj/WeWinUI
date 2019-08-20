export const question_error_msgs = {
    id: [
        { type: '', message: '' }
    ],
    grade: [
        { type: 'required', message: 'Grade is required' }
    ],
    subject: [
        { type: 'required', message: 'Subject is required' }
    ],
    topic: [
        { type: '', message: '' }
    ],
    level: [
        { type: '', message: '' }
    ],
    text: [
        { type: 'required', message: 'Question is required' }
    ],
    tip: [
        { type: '', message: '' }
    ],
    active: [
        { type: '', message: '' }
    ],
    imageSrc: [
        { type: '', message: '' }
    ],
    imageFile: [
        { type: '', message: '' }
    ],
    imageName: [
        { type: '', message: '' }
    ],
    imageTip: [
        { type: '', message: '' }
    ],
    answerExplanation: [
        { type: '', message: '' }
    ],
    sourceId: [
        { type: 'required', message: 'Source is required' }
    ],
    examTag: [
        { type: '', message: '' }
    ],
    answerChoices: [
        { type: 'required', message: 'Choices are required' }
    ]
};

export const login_error_msgs = {
    'username': [
        { type: 'required', message: 'Username is required' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
    ]
};

export const register_error_msgs = {
    'firstname': [
        { type: 'required', message: 'First name is required' },
        { type: 'minlength', message: 'First name be at least 3 characters long' },
        { type: 'maxlength', message: 'First name cannot be more than 30 characters long' },
    ],
    'lastname': [
        { type: 'required', message: 'Last name is required' },
        { type: 'minlength', message: 'Last name be at least 3 characters long' },
        { type: 'maxlength', message: 'Last name cannot be more than 30 characters long' },
    ],
    'username': [
        { type: 'required', message: 'Username is required' },
        { type: 'minlength', message: 'Username must be at least 6 characters long' },
        { type: 'maxlength', message: 'Username cannot be more than 30 characters long' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters' },
        { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'confirm_password': [
        { type: 'required', message: 'Confirm password is required' },
        { type: 'mustMatch', message: 'Password mismatch' }
    ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minlength', message: 'Password must be at least 6 characters long' },
        { type: 'maxlength', message: 'Password cannot be more than 30 characters long' },
        { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    'role': [
        { type: 'required', message: 'Role is required' }
    ],
    'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Enter a valid email' }
    ],
    'mobile': [
        { type: 'required', message: 'Mobile is required' },
        { type: 'minlength', message: 'Enter a valid mobile number (10 digits)' },
        { type: 'maxlength', message: 'Enter a valid mobile number (10 digits)' }
    ],
    'terms': [
        { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
};