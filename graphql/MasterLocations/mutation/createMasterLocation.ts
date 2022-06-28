export const createMasterLocation = /* GraphQL */` 
 mutation createMasterLocation($input: MasterLocationInput){
    createMasterLocation(input: $input){
        _id
        name
        address
        location{
            _id
            masterLocation{
                _id
                name
                address
                onlyAllowAuthUSers
                tree
                createdAt
                updatedAt
                state
                deletedDate
            }
            childLocations{
                _id
                address
                name
                typeCheck
                createdAt
                updatedAt
                state
                deletedDate
            }
            parentLocations{
                _id
                address
                name
                typeCheck
                createdAt
                updatedAt
                state
                deletedDate
            }
            address
            name
            admins{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
            }
            host{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
            }
            security{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
            }
            typeCheck
            device{
                _id
                name
                type
                serialNumber
                status
                exists
                enableVideo
                enableTalk
                timeWait
                banFinish
            }
            createdAt
            updatedAt
            state
            deletedDate
            whoDeleted{
                _id
                name
                lastname
                email
                active
                country
                token
                verifyLogin
                createdAt
                updatedAt
                canCreateHost
                allEventWithAuth
                canAccessToApp
                canAccessToWeb
                document
                typeDocument
                code
                phone
                QR
            }
        }
        onlyAllowAuthUSers
        tree
        createdAt
        updatedAt
        state
        deletedDate
        whoDeleted{
            _id
            name
            lastname
            email
            privilegeID{
                _id
                name
                createdAt
                updatedAt
            }
            active
            country
            token
            verifyLogin
            createdAt
            updatedAt
            canCreateHost
            allEventWithAuth
            canAccessToApp
            canAccessToWeb
            document
            typeDocument
            code
            phone
            QR
        }
    }
}
`;
