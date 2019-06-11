class AppAPI {
  static baseUrl = "http://localhost:4000";
  static fetchListingsUrl = AppAPI.baseUrl + "/listings";
  static fetchMyListingsUrl = AppAPI.baseUrl + "/mylistings";
  static destroyListingUrl = AppAPI.baseUrl + "/deletelisting";
  static createListingUrl = AppAPI.baseUrl + "/createlisting";
  static editListingUrl = AppAPI.baseUrl + "/editlisting";

  static fetchListings() {
    return fetch(this.fetchListingsUrl).then(resp => resp.json());
  }

  static fetchMyListings() {
    return fetch(this.fetchMyListingsUrl, {
      headers: { token: localStorage.getItem("token") }
    }).then(resp => resp.json());
  }

  static destroyListing(id) {
    return fetch(this.destroyListingUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      },
      body: JSON.stringify({
        id
      })
    });
  }

  static createListing(listingDetails) {
    return fetch(this.createListingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      },
      body: JSON.stringify(listingDetails)
    }).then(resp => resp.json());
  }

  static editListing(listingDetails) {
    return fetch(this.editListingUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      },
      body: JSON.stringify(listingDetails)
    }).then(resp => resp.json());
  }
}

export default AppAPI;
