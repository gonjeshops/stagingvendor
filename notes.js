// `

// backendapi.gonje.com/vendor/quotes/count
// backendapi.gonje.com/supplier/quotes/count
// /supplier/product/total
// /supplier/shop/total
// /transaction/total
// /wishlist/total
// /vendor/b2b/my/total/orders


// backendapi.gonje.com/wishlist/add
// backendapi.gonje.com/my/wishlist

// /vendor/b2b/my/orders

// /update/vendor/details
// /update/supplier/details
// `

// put - https://backendapi.gonje.com/update/vendor/details
// business details
// {
//     "business_number": "123456789",
//     "business_name": "ABC Corporation",
//     "contact_details": "John Doe, johndoe@example.com, (555) 123-4567",
//     "shipping_address": {"apt": "5", "city": "Chandigarh", "phone": "+918978907071", "state": "Punjab", "address": "Akoka, Yaba, Lagos Mainland", "postcode": "69678971"},
//     "billing_address": {"apt": "5", "city": "Chandigarh", "phone": "+918978907071", "state": "Punjab", "address": "Akoka, Yaba, Lagos Mainland", "postcode": "69678971"},
//     "longitude": "123.456789",
//     "latitude": "45.678901",
//     "user_address": "789 User St, Villagetown, Country"
// }

// put - https://backendapi.gonje.com/update/b2c/shop

// shop details: {
//     "name": "Awesome Restaurant",
//     "description": "A trendy place with a diverse menu",
//     "address": "123 Main Street, Cityville",
//     "payment_type": "Credit Card",
//     "latitude": "40.7128",
//     "longitude": "-74.0060"
// }

// {
//     "id": 8,
//     "stripe_cus_id": null,
//     "name": "Vendor1",
//     "last_name": null,
//     "email": "b2cshop1@b2c.com",
//     "email_verified_at": null,
//     "created_at": "2021-11-10T10:22:08.000000Z",
//     "updated_at": "2024-01-04T23:51:23.000000Z",
//     "is_active": 1,
//     "shop_id": null,
//     "complete": null,
//     "logo": null,
//     "profile_path": null,
//     "business_number": null,
//     "business_name": null,
//     "contact_details": null,
//     "email_verifiation": 0,
//     "admin_verifiation": 0,
//     "step": 0,
//     "hourly_rate": null,
//     "status": 1,
//     "emp_code": null,
//     "shift_timings": null,
//     "activity_id": null,
//     "payment_type": 1,
//     "deleted_at": null,
//     "subscription_status": null,
//     "referral_code": null,
//     "day_login": "2024-01-04 23:51:23",
//     "auto_checkout": 0,
//     "job_title": null,
//     "job_description": null,
//     "book_balance": "0",
//     "available_balance": "0",
//     "payment_type_name": "1 week",
//     "my_permissions": [
//         "customer",
//         "store_owner"
//     ],
//     "current_time": "2024-01-05T00:02:46.651165Z",
//     "profile": null,
//     "address": [],
//     "card": [],
//     "shops": [
//         {
//             "id": 5,
//             "owner_id": 8,
//             "name": "Bakery Shop",
//             "slug": "bakery-shop",
//             "description": "The bakery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
//             "cover_image": {
//                 "id": "895",
//                 "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/893/Untitled-5.jpg",
//                 "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/893/conversions/Untitled-5-thumbnail.jpg"
//             },
//             "logo": {
//                 "id": "892",
//                 "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/890/bakery.png",
//                 "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/890/conversions/bakery-thumbnail.jpg"
//             },
//             "is_active": 1,
//             "address": {
//                 "zip": "6000",
//                 "city": "Rocky Mount",
//                 "state": "Carolina",
//                 "country": "USA",
//                 "street_address": "4422  Fort Street"
//             },
//             "settings": {
//                 "contact": "12902232121",
//                 "socials": [
//                     {
//                         "url": "https://www.facebook.com/",
//                         "icon": "FacebookIcon"
//                     },
//                     {
//                         "url": "https://www.instagram.com/",
//                         "icon": "InstagramIcon"
//                     }
//                 ],
//                 "website": "https://redq.io/",
//                 "location": {
//                     "lat": 40.7315115,
//                     "lng": -73.99582730000002,
//                     "city": "New York",
//                     "state": "NY",
//                     "country": "United States",
//                     "formattedAddress": "Washington Mews, New York, NY, USA"
//                 }
//             },
//             "created_at": "2021-06-27T03:48:11.000000Z",
//             "updated_at": "2021-07-08T09:23:37.000000Z",
//             "deleted_at": null,
//             "delivery_company_id": 1,
//             "payment_mode": 0,
//             "payment_type": null,
//             "latitude": null,
//             "longitude": null,
//             "balance": {
//                 "id": 5,
//                 "shop_id": 5,
//                 "admin_commission_rate": 10,
//                 "total_earnings": 81.315,
//                 "withdrawn_amount": 0,
//                 "current_balance": 81.315,
//                 "payment_info": {
//                     "bank": "Bank5",
//                     "name": "Bakery Shop",
//                     "email": "bakery@demo.com",
//                     "account": 86453213548641330
//                 },
//                 "created_at": "2021-06-28T03:49:25.000000Z",
//                 "updated_at": "2022-03-04T10:41:57.000000Z"
//             }
//         }
//     ],
//     "managed_shop": null,
//     "wallet": null,
//     "admin_role_permission": [],
//     "permissions": [
//         {
//             "id": 2,
//             "name": "customer",
//             "guard_name": "api",
//             "created_at": "2021-06-27T04:13:00.000000Z",
//             "updated_at": "2021-06-27T04:13:00.000000Z",
//             "pivot": {
//                 "model_id": 8,
//                 "permission_id": 2,
//                 "model_type": "PickBazar\\Database\\Models\\User"
//             }
//         },
//         {
//             "id": 3,
//             "name": "store_owner",
//             "guard_name": "api",
//             "created_at": "2021-06-27T04:13:00.000000Z",
//             "updated_at": "2021-06-27T04:13:00.000000Z",
//             "pivot": {
//                 "model_id": 8,
//                 "permission_id": 3,
//                 "model_type": "PickBazar\\Database\\Models\\User"
//             }
//         }
//     ]
// }