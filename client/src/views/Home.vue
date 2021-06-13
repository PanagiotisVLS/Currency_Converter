<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Currency Converter Application</h1>
          <form>
            <span>Enter your value:</span>
            <!-- Value for the currency to convert -->
            <input
              v-model="currFromValue"
              type="text"
              placeholder="Enter Amount..."
              id="givenCurrValue"
            />
          
            <!-- Dropdown menu for the currency you have -->
            <select id="currencies" name="currenciesFrom" v-model="currFrom">
              <option
                v-for="(value, key) in currencies"
                :value="key"
                :key="key"
              >{{ value }}</option>
            </select>

            <span>Is Equal to:</span>

            <!-- Wanted value text field -->
            <input
              type="text"
              placeholder="Enter Amount..."
              v-model="currToValue"
              id="wantedCurrValue"
              disabled
            />
              <!-- wanted currency droplist -->
            <select id="currencies" name="currenciesFrom"  v-model="currTo">
              <option
                v-for="(value, key) in currencies"
                :value="key"
                :key="key"
              >{{ value }}</option>
            </select>
          </form>
          <div class="button-block">
            <button class="button is-xl is-dark" v-on:click="sendReq()">
              Convert
            </button>
          </div>
        </div>
      </div>
    </section>
    <EventsList />
  </div>
</template>
<script>
import EventsList from "../components/EventsList";
import axios from "axios";
export default {
  name: "home",
  components: {
    EventsList,
  },

  data() {
    return {
      currFrom: "EUR",
      currFromValue: 0,
      currTo: "USD",
      currToValue: 0.0,

      // This array sends the currencies to the drop lists
      currencies: {
        "EUR": "Euro",
        "USD": "US Dollar",
        "JPY": "Japanese Yen",
        "SFR" : "Swiss Franc",
        "GBP" : "British Pound",
        "CAD" : "Canadian Dollar"
      }
    };
  },
  methods: {
    sendReq: function () {
      var self = this;

      // POST Request using axios library
      axios
        .post("http://localhost:8000/calc", {
          currFrom: this.currFrom,
          curr1_value: this.currFromValue,
          currTo: this.currTo,
        })
        .then(function (response) {
          console.log(response.data);
          var currencyResponse = JSON.parse(response.data);
          console.log(currencyResponse.CurrencyTo);
          self.currToValue = currencyResponse.CurrencyTo.toFixed(2);
        })
        .catch(function (error) {
          console.log(error);
          alert("The ratio of the selected currencies cannot be calculated");
        });
    },
  },
};
</script>




<style lang="scss" scoped>

#wantedCurrValue {
    margin-left: 20px;

}

#givenCurrValue {
  margin-left: 20px;
}

#currencies {
  margin-left: 20px;
  margin-right: 20px;
}

.hero {
  text-align: center;
  background-image: url("../../images/background_rates_dark.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}

.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;

}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
}
.is-xl {
  font-size: 1.7rem;
}
</style>