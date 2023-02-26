const Settings = {
    "RegExp": {
        "ForC#ClassName": {
            "Expression": `class (.+?)[ \\r\\n\\t]+\\{`,
            "Flags": "igm"
        },
        "ForC#Properties": {
            "Expression": `public ([(System\\.){0,1}(16)(32)(64)abcdefghilmnorstuy]+?\\?{0,1}) (.+?) \\{`,
            "Flags": "ig"
        },
        "ForKeyAttribute": {
            "Expression": `\\[Key\\][.\\r\\n\\s\\t]*public .*?\\?{0,1} (.+?) `,
            "Flags": "gm"
        }
    },
    "Templates": {
        "Html": {
            "transformer": `
            <!-- ko if: (transformers().length > {index}) -->
            <!-- ko using: transformers()[{index}] -->
            <div class="label">
                <div class="bg-amber-700 flex justify-between p-2 text-white">
                    <div data-bind="text: $data.title"></div>
                    <div class="flex justify-between flex-nowrap items-center gap-x-3">
                        <svgHere> </svgHere>
                    </div>
                </div>
                <!-- ko if: showContent() -->
                <pre data-bind="text: $data.text"></pre>
                <!-- /ko -->
            </div>
            <!-- /ko -->
            <!-- /ko -->
            `,
            "svgHere": `
<!-- ko if: !showContent() -->
<div>
    <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="cursor-pointer w-6 h-6" 
        data-bind="click: function(){ $data.showContent(true)}">
        <title>show the content</title>
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
</div>
<!-- /ko -->

<!-- ko if: showContent() -->
<div>
    <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" 
        class="cursor-pointer w-6 h-6" 
        data-bind="click: function(){ $data.showContent(false)}">
        <title>hide the content</title>
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
</div>
<div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" 
        class="cursor-pointer w-6 h-6"
        data-bind="click: function(){ $root.copy($data.text)}">
        <title>copy</title>
        <desc>copy the content to the clipboard</desc>
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
</div>
<!-- /ko -->

`
        },
        "CSharp": {
            "InitialClass": `public partial class Room
{
    [Key]
    public Guid FirstId { get; set; }
    [Key]
    public Guid SecondId { get; set; }
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
    public System.UInt64? ALongNumber { get; set; }
    public System.String? MaxPersonsNumText { get; set; }
    public string? Phone { get; set; }
    public string? Comment { get; set; }
    public DateTime? Created { get; set; }
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
                "Property": `
    [ObservableProperty]
    private string? {property};    
`
            },
            "Controller": {
                "CRUD": ``,
                "Filter": {
                    "Class": ``,
                    "Linq": {
                        "string": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property}.Contains({model}Filter.{Property}));
}`,
                        "string?": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} != null && x.{Property}.Contains({model}Filter.{Property}));
}`,
                        "System.String": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property}.Contains({model}Filter.{Property}));
}`,
                        "System.String?": `if({model}Filter.{Property} != null) 
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
                        "System.UInt64": `if({model}Filter.{Property} != null) 
{
    q = q.Where(x => x.{Property} == {model}Filter.{Property});
}`,
                        "System.UInt64?": `if({model}Filter.{Property} != null) 
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
        "Blazor": {
            "Types": {
                "Guid": "text",
                "Guid?": "text",
                "string": "text",
                "string?": "text",
                "System.String": "text",
                "System.String?": "text",
                "int": "number",
                "int?": "number",
                "long": "number",
                "long?": "number",
                "System.UInt64?": "number",

                "bool": "checkbox",
                "bool?": "checkbox",
                "DateTime": "datetime",
                "DateTime?": "datetime",
            },
            "Input": `<div>
    <label>{label}</label>
    <input type="{type}" @bind="@{model}.{Property}" />
</div>`,
            "Display": `<div>
    <label>{label}</label>
    <div>@{model}.{Property}</div>
</div>`

        }
    },
    "Transformations": [
        {
            title: "Class Name",
            pretext: () => (window.vM.className ? window.vM.className() : undefined)
        },
        {
            title: "Class Properties",
            mapping: (x) => x[1] + ' ' + x[0]
        },
        {
            title: "Key Properties",
            source: () => (window.vM.keyProperties ? window.vM.keyProperties() : undefined),
            mapping: (x) => x
        },

        {
            title: "Filter attributes",
            mapJoiner: ', ',
            mapping: (x) => 'string? ' + Camel(x[0])
        },
        {
            title: "C# filter class:",
            pretext: (x) => `using CommunityToolkit.Mvvm.ComponentModel;
namespace {Namespace};

public partial class ${window.vM.className ? window.vM.className() : ""
                }Filter: ObservableObject
{
`,
            mapping: (x) => `    [ObservableProperty] 
    private string? _${x[0]};
`,
            posttext: () => `
}
`

        },
        {
            title: "Linq filter",
            mapping: (x) => (Settings.Templates.CSharp.Controller.Filter.Linq[x[1]]??"").replace(/\{model\}/gi,  Camel(vM.className()) ).replace(/\{Property\}/gi,  x[1]) 
        },
        {
            title: "Blazor displays",
            mapping: (x) => Settings.Templates.Blazor.Display
                .replace(/\{model\}/gi, "@" + Camel(vM.className()) )
                .replace(/\{label\}/gi,  x[0]) 
                .replace(/\{property\}/gi,  x[0]) 
        },
        {
            title: "Blazor inputs",
            mapping: (x) => Settings.Templates.Blazor.Input
                .replace(/\{model\}/gi, Camel(vM.className()) )
                .replace(/\{label\}/gi,  x[0]) 
                .replace(/\{property\}/gi,  x[0]) 
                .replace(/\{type\}/gi,  Settings.Templates.Blazor.Types[x[1]]) 
        },
    ]

}