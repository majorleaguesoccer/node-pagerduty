// Generated by CoffeeScript 1.10.0
(function() {
  var PagerDuty, request,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  request = require('request');

  PagerDuty = (function() {
    module.exports = PagerDuty;

    function PagerDuty(arg) {
      this.serviceKey = arg.serviceKey, this.subdomain = arg.subdomain, this.apiToken = arg.apiToken;
      if (this.serviceKey == null) {
        throw new Error('PagerDuty.constructor: Need serviceKey!');
      }
      if (this.subdomain == null) {
        throw new Error('PagerDuty.constructor: Need subdomain!');
      }
      if (this.apiToken == null) {
        throw new Error('PagerDuty.constructor: Need apiToken!');
      }
    }

    PagerDuty.prototype.create = function(arg) {
      var callback, description, details, incidentKey;
      description = arg.description, incidentKey = arg.incidentKey, details = arg.details, callback = arg.callback;
      if (description == null) {
        throw new Error('PagerDuty.create: Need description!');
      }
      return this._request(extend(arguments[0], {
        eventType: 'trigger'
      }));
    };

    PagerDuty.prototype.acknowledge = function(arg) {
      var callback, description, details, incidentKey;
      incidentKey = arg.incidentKey, details = arg.details, description = arg.description, callback = arg.callback;
      if (incidentKey == null) {
        throw new Error('PagerDuty.acknowledge: Need incidentKey!');
      }
      return this._request(extend(arguments[0], {
        eventType: 'acknowledge'
      }));
    };

    PagerDuty.prototype.resolve = function(arg) {
      var callback, description, details, incidentKey;
      incidentKey = arg.incidentKey, details = arg.details, description = arg.description, callback = arg.callback;
      if (incidentKey == null) {
        throw new Error('PagerDuty.resolve: Need incidentKey!');
      }
      return this._request(extend(arguments[0], {
        eventType: 'resolve'
      }));
    };

    PagerDuty.prototype.getIncident = function(arg) {
      var incidentKey;
      incidentKey = arg.incidentKey;
      if (incidentKey == null) {
        throw new Error('PagerDuty.resolve: Need incidentKey!');
      }
      return this._request(extend(arguments[0], {
        eventType: 'get'
      }));
    };

    PagerDuty.prototype._request = function(arg) {
      var callback, description, details, eventType, headers, incidentKey, json, method, uri;
      description = arg.description, incidentKey = arg.incidentKey, eventType = arg.eventType, details = arg.details, callback = arg.callback;
      if (eventType == null) {
        throw new Error('PagerDuty._request: Need eventType!');
      }
      json = {};
      headers = {};
      uri = 'https://events.pagerduty.com/generic/2010-04-15/create_event.json';
      method = 'POST';
      incidentKey || (incidentKey = null);
      details || (details = {});
      callback || (callback = function() {});
      if (eventType === 'get') {
        json.token = this.apiToken;
        uri = "https://" + this.subdomain + ".pagerduty.com/api/v1/incidents/";
        json.incident_key = incidentKey;
        method = 'GET';
        headers.Authorization = "Token token=" + this.apiToken;
      } else {
        json.service_key = this.serviceKey;
        json.event_type = eventType;
        json.description = description;
        json.details = details;
        if (incidentKey != null) {
          json.incident_key = incidentKey;
        }
      }
      return request({
        method: method,
        uri: uri,
        json: json,
        headers: headers
      }, function(err, response, body) {
        if (err || response.statusCode !== 200) {
          return callback(err || new Error(body.errors[0]));
        } else {
          return callback(null, body);
        }
      });
    };

    return PagerDuty;

  })();

}).call(this);