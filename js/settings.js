const Settings = {
    "RegExp":{
        "ForC#ClassName": {
            "Expression":`class (.+?)[ \\r\\n\\t]+\\{`,
            "Flags":"igm"
        },
        "ForC#Properties": {
            "Expression":`public ((Guid|string|bool|int)\\?{0,1} (.*?)) \\{ get`,
            "Flags":"igm"
        }
    },
    "Templates":{
        "CSharp":{
            "Filter": {
                "Class": `
using CommunityToolkit.Mvvm.ComponentModel;
namespace {Namespace};

public partial class {Model}Filter:  ObservableObject
{
    {Properties}
}
                `,
                "Property" : `
    [ObservableProperty]
    private string? {property};    
`
            }
        },
        "Blazor":{
            "Types":{
                "Guid": "text",
                "Guid?": "text",
                "string": "text",
                "string?": "text",
                "int": "number",
                "int?": "number",
                "bool": "checkbox",
                "bool?": "checkbox",
            },
            "Input":`<div>
    <label>{label}</label>
    <input type="{type}" @bind="@{model}.{property}" />
</div>`,
            "Display": `<div>
    <label>{label}</label>
    <div>@{model}.{property}</div>
</div>`

        }
    }

}