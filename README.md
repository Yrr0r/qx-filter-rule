# qx-filter-rule
My QuanX filter rule

# Tracking JSON Location
Abs location: `./tracking.json`
Link: [Findhere](https://quanx.yrr0r.net/tracking.json)

# Format

Define one-by-one:

` <TYPE>, <VALUE>, <proxy|direct|reject>`

or for bulk lists, use this syntax:

```
@begin <TYPE> <proxy|direct|reject>
<values>
@end
```

#### TYPE
- host
- host-suffix
- host-wildcard
- host-keyword

#### VALUE
Domain names for the rule. Wildcards like `*` is accepted. 

# How to subscribe
- Do not subscribe to Github raw file, this repo now use a builder script.
- Subscribe to the actual files in the directory. Refer to tracking location above.