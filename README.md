# template-uno
Sirclo Store 2.0 flagship template

### How to run template on your local environment
1. Create your own [staging SIRCLO Store 2.0](https://store.sirclo.com.dmmy.me/create-online-shop-2.0)
2. Clone template-uno repo to your local environment
3. Create **.env.local** file in your local root directory of template-uno, with the following variables
```
GRAPHQL_URI=https://[your-own-staging-store]/graphql
NEXT_PUBLIC_ENABLE_PREMIUM_FEATURES=true
IS_PROD=false
ASSET_PREFIX=
```
4. Install the npm package dependencies for template-uno, using following command `npm install`
5. Run template-uno using following command `npm run dev`
6. Visit `http://localhost:3000` to view your local template-uno