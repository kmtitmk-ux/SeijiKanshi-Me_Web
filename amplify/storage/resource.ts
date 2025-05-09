import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'SKM01',
    access: (allow) => ({
        // 'profile-pictures/{entity_id}/*': [
        //     allow.guest.to(['read']),
        //     allow.entity('identity').to(['read', 'write', 'delete'])
        // ],
        'public-data/*': [
            allow.authenticated.to(['read', 'write']),
            allow.guest.to(['read', 'write'])
<<<<<<< HEAD
        ],
        'public-data/': [ // ディレクトリ自体のリスト許可
            allow.authenticated.to(['read']),
            allow.guest.to(['read'])
        ],
    })
=======
        ]
    }),
>>>>>>> feature/202505
});

// export const firstBucket = defineStorage({
//     name: 'firstBucket',
//     isDefault: true, // identify your default storage bucket (required)
// });
