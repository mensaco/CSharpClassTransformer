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