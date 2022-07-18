using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    
        #nullable enable
        protected ActionResult HandleResult<T>(Result<T> result, Uri? uri = null)
        {
            if (result == null)
            {
                return NotFound();
            }
            
            // 201 Created
            if (result.IsSuccess && result.Value != null && result.IsNew && uri != null)
            {
                return Created(uri, result.Value);
            }
            
            // 200 OK
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }

            // 404 Not Found
            if (result.IsSuccess && result.Value == null)
            {
                return NotFound();
            }

            // 400 Bad Request
            return BadRequest(result.Error);
        }
    }
}