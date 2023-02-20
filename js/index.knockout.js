// -----------------------------------------
ko.bindingHandlers.editableHTML = {
    init: function (element, valueAccessor) {
        //var $element = $(element);
        var initialValue = ko.utils.unwrapObservable(valueAccessor());
        element.innerHTML = initialValue;
        element.addEventListener('keyup', function () {
            observable = valueAccessor();
            observable(element.innerHTML);
        });
    }
};

function AugmentHtml() {

    var cards = document.querySelectorAll("card");
    for(var i = cards.length - 1; i >= 0; i--){
        var cd = cards[i];
        const name = cd.getAttribute("name")
        const title = cd.getAttribute("title")
        const bind = cd.getAttribute("bind")

        const newOHTML = Settings.Templates.Html.card
            .replace(/\{name\}/g, name)
            .replace(/\{title\}/g, title)
            .replace(/\{bind\}/g, bind + ": " + name)

        

        cd.outerHTML =  newOHTML;
        
        var dummy = 0
    }
    

    [...document.querySelectorAll("svgHere")].forEach(sh => {
        sh.outerHTML = Settings.Templates.Html.svgHere
    });
}

AugmentHtml();

// -----------------------------------------
function Camel(s) {
    if (!s) return "";
    const s1 = s[0].toLowerCase();
    if (s.length == 1) return s1

    return s1 + s.substring(1)
}

// -----------------------------------------
function CopyElementContentsToClipboard(e) {
    var element = e.srcElement.parentElement.parentElement.nextElementSibling

    if (element.textContent) {
        navigator.clipboard.writeText(element.textContent);
        return;
    }


    // Copy the text inside the text field

    if (element.value) {
        navigator.clipboard.writeText(element.value);
        // Select the text field
        element.select();
        element.setSelectionRange(0, 99999); // For mobile devices
    }
    else {
        console.log("Element property to copy not implemented.")
    }


}

// -----------------------------------------
[...document.querySelectorAll(".label > div > svg")].forEach(s => {
    s.addEventListener("click", (e) => {
        e.stopPropagation()        
        CopyElementContentsToClipboard(e);
    })
})

// -----------------------------------------
class ViewModel {
    constructor() {
        var self = this;

        self.bytes = ko.observableArray()

        self.toggleclassName = ko.observable(true)
        self.toggleproperties = ko.observable(true)
        self.togglekeyProperties = ko.observable(true)
        self.togglefilterClass = ko.observable(true)
        self.toggleattributes = ko.observable(true)
        self.togglelinqFilter = ko.observable(true)
        self.toggleblazorDisplays = ko.observable(true)
        self.toggleblazorInputs = ko.observable(true)
        
        self.inputHtml = ko.observable(Settings.Templates.CSharp.InitialClass);

        self.className = ko.pureComputed(function () {
            // extract class name
            const cn = Settings.RegExp["ForC#ClassName"];
            const clasRegex = new RegExp(cn.Expression, cn.Flags);
            var cnl = [];
            self.inputHtml().replace(clasRegex, function (m, p1) { cnl.push(p1); });
            if (cnl && cnl.length == 1) {
                return cnl[0];
            }
            return "";
        });

        self.camelClassName = ko.pureComputed(function () {
            return Camel(self.className());
        })

        self.propList = ko.pureComputed(function () {
            // extract properties
            const pp = Settings.RegExp["ForC#Properties"];
            const r = new RegExp(pp.Expression, pp.Flags);
            var a = [];
            self.inputHtml().replace(r, function (m, p1) { a.push(p1.split(' ')); });
            return a;
        });

        self.keyProperties = ko.pureComputed(function(){
            // extract properties decorated with the [Key] - attribute
            const pp = Settings.RegExp.ForKeyAttribute;
            const r = new RegExp(pp.Expression, pp.Flags)
            var a = []
            self.inputHtml().replace(r, function (m, p1) { 
                a.push(p1); 
            });
            return a.join("\r\n");            
        })


        self.properties = ko.pureComputed(function () {
            return self.propList().map(x => x[0] + ' ' + x[1]).join('\r\n');
        }, self);

        self.attributes = ko.pureComputed(function () {
            return self.propList().map(x => 'string? ' + Camel(x[1])).join(', ');
        }, self);

        self.filterClass = ko.pureComputed(function () {
            const ct = Settings.Templates.CSharp.Filter.Class;
            const pt = Settings.Templates.CSharp.Filter.Property;

            const properties = self.propList().map(x => pt
                .replace("{property}", Camel(x[1]))
            ).join('');

            return ct
                .replace("{Model}", self.className())
                .replace("{Properties}", properties)
        }, self);


        self.linqFilter = ko.pureComputed(function () {
            const cn = Camel(self.camelClassName());
            return self.propList().map(x => Settings.Templates.CSharp.Controller.Filter.Linq[x[0]]
                .replace(/\{Property\}/g, x[1])
                .replace(/\{model\}/g, cn)
            ).join('\r\n')
        });

        self.blazorInputs = ko.pureComputed(function () {
            const T = Settings.Templates.Blazor.Input;
            const Ty = Settings.Templates.Blazor.Types;
            return self.propList().map(x => T
                .replace("{label}", x[1])
                .replace("{property}", Camel(x[1]))
                .replace("{type}", Ty[x[0]])
                .replace("{model}", self.camelClassName())
            ).join('\r\n');
        }, self);

        self.blazorDisplays = ko.pureComputed(function () {
            const T = Settings.Templates.Blazor.Display;
            const Ty = Settings.Templates.Blazor.Types;
            return self.propList().map(x => T
                .replace("{label}", x[1])
                .replace("{property}", Camel(x[1]))
                .replace("{model}", self.camelClassName())).join('\r\n')
        }, self);




    }
}


var vM = new ViewModel();

ko.applyBindings(vM);