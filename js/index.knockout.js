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
    for (var i = cards.length - 1; i >= 0; i--) {
        var cd = cards[i];
        const name = cd.getAttribute("name")
        const title = cd.getAttribute("title")
        const bind = cd.getAttribute("bind")

        const newOHTML = Settings.Templates.Html.card
            .replace(/\{name\}/g, name)
            .replace(/\{title\}/g, title)
            .replace(/\{bind\}/g, bind + ": " + name)

        cd.outerHTML = newOHTML;

        var dummy = 0
    }


    [...document.querySelectorAll("transformer")].forEach(sh => {
        const index = sh.getAttribute("index")
        const oh = Settings.Templates.Html.transformer.replace(/\{index\}/gi, index)
        sh.outerHTML = oh
    });

    [...document.querySelectorAll("svgHere")].forEach(sh => {
        const oh = Settings.Templates.Html.svgHere
        sh.outerHTML = oh
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
class ViewModel {
    constructor() {
        var self = this;

        self.txtDiv = document.createElement("div")
        
        self.showInputContent = ko.observable(true)

        self.inputHtml = ko.observable(Settings.Templates.CSharp.InitialClass);

        self.copy = function (text) {
            if(navigator && navigator.clipboard) {                
                self.txtDiv.textContent = text
                navigator.clipboard.writeText(self.txtDiv.textContent)                
            }        
        }

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

        self.properties = ko.pureComputed(function () {
            // extract simple C# property names and types
            const pp = Settings.RegExp["ForC#Properties"];
            const r = new RegExp(pp.Expression, pp.Flags);
            var a = [];
            self.inputHtml().replace(r, function (m, p1, p2) {
                a.push([p2, p1])
            })

            return a;
        })

        self.keyProperties = ko.pureComputed(function () {
            // extract properties decorated with the [Key] - attribute
            const pp = Settings.RegExp.ForKeyAttribute;
            const r = new RegExp(pp.Expression, pp.Flags)
            var a = []
            self.inputHtml().replace(r, function (m, p1) {
                a.push(p1);
            });
            return a;
        })

        self.transformers = ko.observableArray([])

    }
}


window.vM = new ViewModel();

ko.applyBindings(window.vM);

Settings.Transformations.forEach(t => {
    var source = window.vM.properties
    var tr = {};
    tr.showContent = ko.observable(true)
    tr.title = t.title
    if (!!t.source) {
        source = t.source
    }
    var pre = t.pretext ? t.pretext() : "";
    var pst = t.posttext ? t.posttext() : "";
    var mapJoiner = '\r\n'

    if(t.mapJoiner){
        mapJoiner = t.mapJoiner
    }

    var mid = "";
    if (t.mapping) {
        mid = source().map(x => t.mapping(x)).join(mapJoiner)
    }

    tr.text = pre + mid + pst
    window.vM.transformers.push(tr)
});

