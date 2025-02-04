package v1

import (
	"github.com/VuKhoa23/advanced-web-be/internal/domain/entity"
	httpcommon "github.com/VuKhoa23/advanced-web-be/internal/domain/http_common"
	"github.com/VuKhoa23/advanced-web-be/internal/domain/model"
	"github.com/VuKhoa23/advanced-web-be/internal/service"
	"github.com/VuKhoa23/advanced-web-be/internal/utils/validation"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

type UserHandler struct {
	userService *service.UserService
}

func NewUserHandler(userService *service.UserService) *UserHandler {
	return &UserHandler{userService: userService}
}

func (h *UserHandler) Register(c *gin.Context) {
	var auth model.AuthRequest
	err := validation.BindJsonAndValidate(c, &auth)
	if err != nil {
		return
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(auth.Password), bcrypt.DefaultCost)
	auth.Password = string(hashedPassword)
	err = h.userService.Register(c, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, httpcommon.NewErrorResponse(
			httpcommon.Error{
				Message: err.Error(),
				Code:    httpcommon.ErrorResponseCode.InternalServerError,
			},
		))
		return
	}
	c.AbortWithStatus(204)
}

func (h *UserHandler) Login(c *gin.Context) {
	var auth model.AuthRequest
	err := validation.BindJsonAndValidate(c, &auth)
	if err != nil {
		return
	}

	user, err := h.userService.Login(c, auth)
	if err != nil {
		c.JSON(http.StatusInternalServerError, httpcommon.NewErrorResponse(
			httpcommon.Error{
				Message: err.Error(),
				Code:    httpcommon.ErrorResponseCode.InvalidRequest,
			},
		))
		return
	}
	c.JSON(200, httpcommon.NewSuccessResponse[entity.User](&entity.User{
		Username: user.Username,
		Id:       user.Id,
	}))
}

func (h *UserHandler) WhoAmI(c *gin.Context) {
	userId, _ := c.Get("userId")

	c.JSON(200, httpcommon.NewSuccessResponse[map[string]interface{}](&map[string]interface{}{
		"userId": userId,
	}))
}
