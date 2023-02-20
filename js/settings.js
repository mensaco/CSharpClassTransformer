const Settings = {
    "RegExp":{
        "ForC#ClassName": {
            "Expression":`class (.+?)[ \\r\\n\\t]+\\{`,
            "Flags":"igm"
        },
        "ForC#Properties": {
            "Expression":`public ((Guid|string|bool|int)\\?{0,1} (.*?)) \\{ get`,
            "Flags":"igm"
        },
        "ForKeyAttribute": {
            "Expression" : `\\[Key\\][.\\r\\n\\s\\t]*public .*?\\?{0,1} (.+?) `,
            "Flags": "gm"
        }
    },
    "Templates":{
        "Html": {
            "card":`
            <div class="label" data-bind="click: function() { toggle{name}(!toggle{name}())}">
    <div>
        <div>{title}</div>
        <!-- ko if: toggle{name}() -->
        <svgHere></svgHere>
        <!-- /ko -->
    </div>
    <!-- ko if: toggle{name}() -->
    <pre data-bind="{bind}"></pre>
    <!-- /ko -->
</div>`,
            "svgHere":`
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 cursor-pointer" title="copy contents to the clipboard">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>`
        },
        "CSharp":{
            "InitialClass":`public partial class Room
{
    public Guid Id { get; set; }
    public int? SrcId { get; set; }
    public string Name { get; set; } = null!;
    public string? Number { get; set; }
    public bool? Approved { get; set; }
    public bool? Locked { get; set; }
    public bool? IsExternal { get; set; }
    public bool? UiShowInOverview { get; set; }
    public bool? UiUseAsFilter { get; set; }
    public int? UiSortOrder { get; set; }
    public string? Building { get; set; }
    public string? MaxPersonsNumText { get; set; }
    public string? Phone { get; set; }
    public string? Comment { get; set; }
    public virtual ICollection Reservations { get; } = new List();
    public virtual ICollection RoomBookings { get; } = new List();
    public virtual RoomCalender? RoomCalender { get; set; }
}`,
            "Filter": {
                "Class": `using CommunityToolkit.Mvvm.ComponentModel;
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
            },
            "Controller": {
                "CRUD": ``,
                "Filter": {
                    "Class":``,
                    "Linq":{
                        "string": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property}.Contains({model}Filter.{Property}));
}`,
                        "string?": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} != null && x.{Property}.Contains({model}Filter.{Property}));
}`,
                        "bool": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} == {model}Filter.{Property});
}`,
                        "bool?": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} != null && x.{Property} == {model}Filter.{Property});
}`,
                        "int": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} == {model}Filter.{Property});
}`,
                        "int?": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} != null && x.{Property} == {model}Filter.{Property});
}`,
                        "Guid": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} == {model}Filter.{Property});
}`,
                        "Guid?": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} != null && x.{Property} == {model}Filter.{Property});
}`,
                    }
                }
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