# Change Log

All notable changes to SIRCLO's Template Uno will be documented in this file.

# release-20210803

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.12.1) version 1.12.1

### Bug fixes
* Direct to place order for all case
* Coupon can't add & remove if not logged in
* Coupon no coupon output 0 because && conditional
* Products handle membershipModelID
* AddToCart fix onError AddtoCart
* Payment confirmation image type validation
* Product fix no resource and handle catch on complete product / fix product recomendation
* Product detail toggle product reviews visibility based on web setting
* Product flipped logic for ProductTitle
* Product remove suffix ‘Single Variant’
* Product return totalItems on get product crossell
* Apollo cache normalization and invalidation
* Navigation unescape special characters
* Add missing key fields (ID)

### Features
* Direct to placeorder after login register
* ProductDetailv2 add EstimateShipping

# release-20210719

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.11.5) version 1.11.5

### Bug fixes
* Coupon handle submit if coupon bundle is applied
* Coupon hide promo bundle code if applied with another promo + handle coupon price breakdown
* Estimate shipping remove unused props and fix unload image
* NexusImage reset lazyload class if src is updated
* Order summary calculate total cart
* Order summary update totalCost after every cart query
* WYSIWYG image width, height, and src
* Product fixing fetch policy filter variant
* Update api key
* Order review handle review by order token/guest
* Placeorder return member cart on PlaceOrderFormHelper
* Product detail persist 2nd variant on 1st variant change
* PrivateRoute add usecallback on handleDirection page

### Features
* Privateroute add debounce oncomplete getTotalItems
* SSO add on error sso and import to index component MaintenanceMode
* WYSIWYGConverter exclude append script on script button io
* SSO add loading component & flagging is mobile on facebook login

# release-20210702

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.10.16) version 1.10.16

### Bug fixes
* Navigation update fetch policy
* Product detail remove membership error on errorComponent
* Product detail update fetch-policy and add membershipModelID for ProductDetailv2
* Thumbor webp validation on safari
* Order history Remapping unpaid and confirming status
* Product category image thumbor config not applied
* Add width & height on all image components
* Banner improvement & lazy load on image & thumbor
* Button classname addToCart for support tiktok pixel 
* Product filter filter variant not updated
* Products add default value for item per page
* Products filter conflicts with url param
* Image add props width & height & fix unhandled error on safari
* Products filter variant key type error
* withBrand fix getCart on withBrand
* Refetch undefined result from safari
* WYSIWYG remove thumbor
* Payment bank transfer redirect
* Fix pathname router
* Add retry link apollo & fix refetch method
* Account fix handleButtonDelivered
* Add retry link apollo & fix refetch method

### Features
* Brand add googleAdsWebsiteMetaToken
* Direct checkout update total item in cart
* Product detail add props withButtonBuyNow
* Products enable redirect checkout
* Artciles add hooks getArticles
* Helpers add getBlogs and getAllowedActions helpers
* Cart handle skip getCart and add emptyStateComponent

# release-20210623

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.10) version 1.9.10

### Bug fixes
* Coupon add loading component for cart summary
* Hide WA option
* Coupon add membershipModelID
* Coupon coupon and points loading component
* Payment link generated twice in a single query
* Payment selected payment method validation
* Product Category add href on Product Category
* Variant fix default value variant
* Logistix Field set default value location list
* Thumbor & Newsletters convert content img to thumbor & add props thumborSetting on Newsletters component
* Order Review fix counting character of review
* Shipping Methods: conditional i18n for set pinpoint
* Account fix function button Delivered
### Features
* Account add loading and empty state component
* Ordersummary fix onSaveCartError
* Shipping Methods mapping error shippingCostEstimation
* Account add order status completed & handle confirmation order to completed
* Account add status cancelled
* Estimate Shipping add image provider
# release-20210531

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.6) version 1.9.6

### Bug fixes

* Login issue
* Navigation update limit navigation to 500 items
* Revert fix (apolloClient) fix URL graphql fqdn
* Account: date of birth select
* Instagram-feed: add alt text and fix loading state
* Order-summary: add shipping cost breakdown
* Order-summary: shipping cost breakdown on cart and place_order page
* Product-detail: show membership discount price
* Products: type error
* Products: type error
* Register: fix register redirect
* FormatDate helper

### Features

* Allow function lookbook
* Pagination disable spacer pointer-event
* Pagination limit page numbers
* Products show membership discount
* Register handle auto login after register

# release-20210510

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.9.1) version 1.9.1

### Bug fixes

* Hide product detail if published status is false
* Shipment tracker in order history table
* Handle payment link error
* Handle popup on retry
* Handle warning payment limit
* Clear search query on category select
* Refetch products with query

# release-20210430

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.29) version 1.8.29

### Bug fixes

* Membership
* Product category dropdown icon click handler
* Payment handle popup on retry
* Products clear search query on category select

### Features

* Handle escape blog and article
* Product cards add tagnames props
* Product detail handle some object to escape special character
* Widget add hash for recurring script

# release-20210423

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.20) version 1.8.20

### Bug fixes

* Image loading service per variant
* Section hidden cross sell

### Features

* Tautan / Links
* Membership History
* Use point webstore on step checkout

# release-20210416

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.17) version 1.8.17

### Bug fixes

* fix thank you page & payment status page url
* Improve redirect to default language, can handle more than 1 uri segment

### Features

* Blog List
* Blog Detail with Social Share
* Google SSO
* Notify Me
* Allow function policy
* Product bundling
* Product review and ratings
* Product recommendation
* Coupon
* Shipping method instant courier
* Shipment tracking
* Discount line items in cart
* Line items error in cart

# release-20210409

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.8.9) version 1.8.9

### Bug fixes

* fix cart handle disable button add and minus when loading
* fix calculation shipping coupon
* fix disabled if shipping.isEnable false && shipping is instant or sameday
* fix disabled shipping condition
* fix styling shipment tracking

### Features

* Shipment tracking

# release-20210303

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.4.14) version 1.4.14

### Bug fixes

* Fix pagination in product list
* Fix cart ignore stock
* Fix multiple order, when brute click pay button
* Fix can not edit account
* Fix product display lower price
* Fix typo i18n edit account
* Fix shipping cost calculation, item weight included
* Fix related product to be removed from product detail page
* Fix error page always redirect to /id/id

### Changed

* Change copyright wording

### Features

* Pin point location in account and place order
* Filter & sort enhancement
* Social share
* Total bill on payment confirmation
* Add quantity in order detail on place order

# release-20210115

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.2.0) version 1.2.0

### Bug fixes

* Fix keypress on login & register form

### Features

* Hide strength level password, display when on focus
* Add payment status page on payment gateway end journey

# release-20201231

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/1.1.0) version 1.1.0

### Bug fixes

* Fix banner link styling
* Fix discount price on cart
* Fix image category fallback
* Fix change password error
* Fix invoice link and input amount field on payment confirmation

### Features

* Ignore stock item
* Move cart using BE API
* Password validation
* Tag name badge & support validation
* Pagination order history
* Testimonials with carousel
* Hide blog features (unfinished feature)

# release-20201218

**note**: using [nexus](https://www.npmjs.com/package/@sirclo/nexus/v/0.8.5) version 0.8.5

### Features

* all basic features Sirclo store V2