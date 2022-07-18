using Domain;
using FluentValidation;

namespace Application.Activities;

public class ActivityValidator : AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Category).NotEmpty().MinimumLength(2);
        RuleFor(x => x.City).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Date).NotEmpty();
        RuleFor(x => x.Description).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Category).NotEmpty().MinimumLength(2);
        RuleFor(x => x.Venue).NotEmpty().MinimumLength(2);
    }
}