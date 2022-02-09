# Slack-Bot-PageSpeed-Insights

![image](https://user-images.githubusercontent.com/85903752/153112268-e0607d56-7c26-43fd-b898-d2ecfa735de1.png)

## Description
This slack bot returns the requested website's PageSpeed Insights' report. 

## Usage
After installing the bot in your workspace:
```
/psi <url> [--strategy strategyValue]
```

#### url
Type: `string`

#### strategy
Type: `string` <br>
Default: `mobile` <br>
Values: `mobile` or `desktop` <br>

Specifies the strategy used to analyze the webpage.

## Example

```
/psi chrisgonel.com --strategy desktop
```
### returns
![image](https://user-images.githubusercontent.com/85903752/153112545-445a738e-4889-4d74-9ad3-3e1a2082e97a.png)



