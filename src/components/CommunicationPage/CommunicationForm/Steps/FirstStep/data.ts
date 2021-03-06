import * as Yup from 'yup';

import {
    dateValidation,
    stringValidation,
    objectValidation,
    booleanValidation,
} from '../../../../../shared/SSOT/schemas/yup';

import {
    Damage,
    PolicyOwner,
    Owner,
    conditionalPersonDeath,
    conditionalRegistrationNumber,
    conditionalVehicleLeasing,
    conditionalPolicyOWner,
    conditionalPersonalIdentity,
    conditionalRegon,
} from './conditionals';

const DATE = 'date';
const TIME = 'time';
const DAMAGE = 'damage';
const PERSON_DEATH = 'personDeath';
const OWNER = 'owner';
const REASON = 'reason';
const POLICY = 'policy';
const KNOWN_POLICY = 'knownPolicy';
const REGISTRATION_NUMBER = 'registrationNumber';
const VEHICLE_LEASING = 'vehicleLeasing';
const POLICY_OWNER = 'policyOwner';
const PERSONAL_IDENTITY = 'personalIdentity';
const REGON = 'regon';

export const firstStepInitialValues = {
    [DATE]: null,
    [TIME]: null,
    [DAMAGE]: '',
    [PERSON_DEATH]: '',
    [OWNER]: '',
    [REASON]: null,
    [POLICY]: '',
    [KNOWN_POLICY]: false,
    [REGISTRATION_NUMBER]: '',
    [VEHICLE_LEASING]: '',
    [POLICY_OWNER]: '',
    [PERSONAL_IDENTITY]: '',
    [REGON]: '',
};

export interface IFirstStepForm {
    [DATE]: Date | null;
    [TIME]: Date | null;
    [DAMAGE]: Damage;
    [PERSON_DEATH]: string;
    [OWNER]: Owner;
    [REASON]: { value: string } | null;
    [POLICY]: string;
    [KNOWN_POLICY]: boolean;
    [REGISTRATION_NUMBER]: string;
    [VEHICLE_LEASING]: string;
    [POLICY_OWNER]: PolicyOwner;
    [PERSONAL_IDENTITY]: string;
    [REGON]: string;
}

export const fieldsData = {
    [DATE]: {
        name: DATE,
        label: 'Data zdarzenia',
        id: DATE,
    },
    [TIME]: {
        name: TIME,
        label: 'Czas zdarzenia',
        id: TIME,
    },
    [DAMAGE]: {
        name: DAMAGE,
        label: 'Czego dotyczy zgłoszenie?',
        id: DAMAGE,
    },
    [PERSON_DEATH]: {
        name: PERSON_DEATH,
        label: 'Czy na skutek zdarzenia nastąpiła śmierć poszkodowanego?',
        id: PERSON_DEATH,
    },
    [OWNER]: {
        name: OWNER,
        label: 'Z czyjego ubezpieczenia zgłaszasz szkodę?',
        id: OWNER,
    },
    [REASON]: {
        name: REASON,
        label: 'Wybierz przyczynę najlepiej pasującą do zdarzenia',
        id: REASON,
    },
    [POLICY]: {
        name: POLICY,
        label: 'Podaj numer polisy',
        id: POLICY,
    },
    [REGISTRATION_NUMBER]: {
        name: REGISTRATION_NUMBER,
        label: 'Podaj numer rejestracyjny pojazdu',
        id: REGISTRATION_NUMBER,
    },
    [POLICY_OWNER]: {
        name: POLICY_OWNER,
        label: 'Właścicielem polisy jest',
        id: POLICY_OWNER,
    },
    [VEHICLE_LEASING]: {
        name: VEHICLE_LEASING,
        label: 'Czy pojazd poszkodowanego jest przedmiotem leasingu?',
        id: VEHICLE_LEASING,
    },
    [REGON]: {
        name: REGON,
        label: 'REGON',
        id: REGON,
    },
    [PERSONAL_IDENTITY]: {
        name: PERSONAL_IDENTITY,
        label: 'Pesel poszkodowanego',
        id: PERSONAL_IDENTITY,
    },
    [KNOWN_POLICY]: {
        name: KNOWN_POLICY,
        label: 'Nie znam numeru polisy',
        id: KNOWN_POLICY,
    },
};

export const firstStepValidationSchema = Yup.object({
    [DATE]: dateValidation,
    [TIME]: dateValidation,
    [DAMAGE]: stringValidation,
    [PERSON_DEATH]: Yup.mixed().when(DAMAGE, {
        is: conditionalPersonDeath,
        then: stringValidation,
    }),
    [OWNER]: stringValidation,
    [REASON]: objectValidation,
    [POLICY]: stringValidation,
    [KNOWN_POLICY]: booleanValidation,
    [REGISTRATION_NUMBER]: Yup.mixed().when([DAMAGE, OWNER], {
        is: conditionalRegistrationNumber,
        then: stringValidation,
    }),
    [VEHICLE_LEASING]: Yup.mixed().when([DAMAGE, OWNER, POLICY_OWNER], {
        is: conditionalVehicleLeasing,
        then: stringValidation,
    }),
    [POLICY_OWNER]: Yup.mixed().when([DAMAGE, OWNER], {
        is: conditionalPolicyOWner,
        then: stringValidation,
    }),
    [PERSONAL_IDENTITY]: Yup.mixed().when([DAMAGE, OWNER, POLICY_OWNER], {
        is: conditionalPersonalIdentity,
        then: stringValidation,
    }),
    [REGON]: Yup.mixed().when([POLICY_OWNER], {
        is: conditionalRegon,
        then: stringValidation,
    }),
});
